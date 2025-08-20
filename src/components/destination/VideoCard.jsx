import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export default function VideoCard({
  videoSrc = "",
  thumbnailSrc = "",
  thumbnailAlt = "Video thumbnail",
}) {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc={videoSrc}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt={thumbnailAlt}
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc={videoSrc}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt={thumbnailAlt}
      />
    </div>
  );
}
