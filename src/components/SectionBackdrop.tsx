import { sectionBackgrounds, type SectionBackgroundKey } from "../config";

type Props = {
  scene: SectionBackgroundKey;
};

/** Full-bleed photo + shared light scrim (readable type, Sitara-style depth). */
export default function SectionBackdrop({ scene }: Props) {
  const bg = sectionBackgrounds[scene];

  return (
    <>
      <div
        className="section-bg-layer"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundPosition: bg.position,
        }}
      />
      <div className="section-bg-scrim" aria-hidden="true" />
    </>
  );
}
