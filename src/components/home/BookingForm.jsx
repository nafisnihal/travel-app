import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ChevronDownIcon } from "lucide-react";
import { motion as m } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  date: z
    .date({
      required_error: "Please select a travel date",
    })
    .refine((date) => date > new Date(), {
      message: "Travel date must be in the future",
    }),
});

const FORM_STORAGE_KEY = "travel-booking-form-data";
const DATA_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

const BookingForm = memo(({ selectedDstn, submitted, setSubmitted }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const hasRestoredRef = useRef(false);
  const restorationKey = useRef(null);

  const formConfig = useMemo(
    () => ({
      resolver: zodResolver(bookingSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        date: null,
      },
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm(formConfig);

  const watchedDate = watch("date");
  const watchedForm = watch();

  const isDateDisabled = useCallback((date) => date < new Date(), []);

  // localStorage save with debouncing
  const saveToLocalStorage = useCallback(
    (formData) => {
      const dataToSave = {
        selectedDstn,
        formData: {
          ...formData,
          date: formData.date ? formData.date.toISOString() : null,
        },
        timestamp: Date.now(),
      };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    },
    [selectedDstn]
  );

  // Debounce for saving data to localStorage
  useEffect(() => {
    if (
      selectedDstn &&
      (watchedForm.name ||
        watchedForm.email ||
        watchedForm.phone ||
        watchedForm.date)
    ) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage(watchedForm);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [watchedForm, selectedDstn, saveToLocalStorage]);

  // Load form data from localStorage
  useEffect(() => {
    if (!selectedDstn) return;

    // Create a unique key for this destination + component instance
    const currentKey = `${selectedDstn}-${Date.now()}`;

    // If we already restored for this destination, skip
    if (hasRestoredRef.current && restorationKey.current === selectedDstn) {
      console.log("Skipping restoration - already done for", selectedDstn);
      return;
    }

    const savedData = localStorage.getItem(FORM_STORAGE_KEY);

    if (savedData) {
      try {
        const {
          formData,
          selectedDstn: savedDestination,
          timestamp,
        } = JSON.parse(savedData);

        // only restoring if it's for the same destination and not too older than 24 hours
        const isDataValid =
          savedDestination === selectedDstn &&
          Date.now() - timestamp < DATA_EXPIRY_TIME;

        if (isDataValid && formData) {
          hasRestoredRef.current = true;
          restorationKey.current = selectedDstn;

          setTimeout(() => {
            if (formData.name) {
              setValue("name", formData.name);
            }
            if (formData.email) {
              setValue("email", formData.email);
            }
            if (formData.phone) {
              setValue("phone", formData.phone);
            }
            if (formData.date) {
              const dateValue = new Date(formData.date);
              if (!isNaN(dateValue.getTime())) {
                setValue("date", dateValue);
              }
            }

            // checking restored message only if there's actual form data
            if (formData.name || formData.email || formData.phone) {
              toast.success("Your booking form has been restored!");
            }
          }, 100);
        } else {
          localStorage.removeItem(FORM_STORAGE_KEY);
          hasRestoredRef.current = true;
          restorationKey.current = selectedDstn;
        }
      } catch (error) {
        console.error("Error loading data:", error);
        localStorage.removeItem(FORM_STORAGE_KEY);
        hasRestoredRef.current = true;
        restorationKey.current = selectedDstn;
      }
    } else {
      hasRestoredRef.current = true;
      restorationKey.current = selectedDstn;
    }
  }, [selectedDstn, setValue]);

  // Reset restoration flag when destination changes
  useEffect(() => {
    if (restorationKey.current !== selectedDstn) {
      hasRestoredRef.current = false;
      restorationKey.current = null;
    }
  }, [selectedDstn]);

  // Optimized onSubmit with useCallback
  const onSubmit = useCallback(
    async (data) => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        saveToLocalStorage(data);
        toast.error("Please log in to complete your booking");
        navigate("/login");
        return;
      }

      try {
        toast.success(`Booking successful for ${selectedDstn}!`);
        localStorage.removeItem(FORM_STORAGE_KEY);
        reset();
        setSubmitted(true);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [
      isAuthenticated,
      selectedDstn,
      navigate,
      reset,
      setSubmitted,
      saveToLocalStorage,
    ]
  );

  // Optimized date selection handler
  const handleDateSelect = useCallback(
    (date) => {
      setValue("date", date);
      setOpen(false);
    },
    [setValue]
  );

  if (!selectedDstn) return null;

  return (
    <div className={`${
        submitted ? "bg-transparent" : "bg-black/10 backdrop-blur-md"
    } w-full md:w-[800px] mt-4 p-4 rounded-lg`}>
      {submitted ? (
        <m.div
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-lg font-semibold text-white text-center">
            Booking Confirmed for{" "}
            <span className="capitalize"> {selectedDstn}</span>
          </p>
          <Link to="/">
            <Button className="rounded-xl text-xs bg-white text-black dark:bg-black dark:text-white hover:bg-white dark:hover:bg-black">
              Explore you destination here <ArrowRight />
            </Button>
          </Link>
        </m.div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4 text-white text-center">
            Book Your Trip to <span className="capitalize">{selectedDstn}</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="bg-transparent placeholder:text-gray-300"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs text-left">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="bg-transparent placeholder:text-gray-200"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="bg-transparent placeholder:text-gray-200"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs text-left">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Travel Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none hover:text-white"
                    >
                      {watchedDate
                        ? watchedDate.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={watchedDate}
                      captionLayout="dropdown"
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-red-500 text-xs text-left">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 rounded-md bg-white text-black dark:bg-black dark:text-white hover:bg-white dark:hover:bg-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Booking"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
});

export default BookingForm;
