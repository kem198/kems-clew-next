"use client";

import { Archive, ArchiveTag } from "@/features/archives/archive";
import { WORK_TAGS } from "@/features/archives/constants";
import {
  AlbumPhoto,
  mapArchivesToPhotos,
} from "@/features/archives/repository";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { ChevronLeft, ChevronRight, FilterIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

const columns = (containerWidth: number) => {
  // if (containerWidth < 640) return 1;
  if (containerWidth < 768) return 2;
  if (containerWidth < 1024) return 3;
  return 4;
};

type GroupToggleProps = {
  groupByYear: boolean;
  onChange: (value: boolean) => void;
};

function GroupToggle({ groupByYear, onChange }: GroupToggleProps) {
  return (
    <RadioGroup
      value={groupByYear ? "year" : "all"}
      onValueChange={(value) => onChange(value === "year")}
      className="not-prose flex items-center gap-6"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="all" id="group-all" className="bg-zinc-50" />
        <Label htmlFor="group-all">未分類</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="year" id="group-year" className="bg-zinc-50" />
        <Label htmlFor="group-year">年度ごとに表示</Label>
      </div>
    </RadioGroup>
  );
}

type TagFilterValue = ArchiveTag | "untagged" | null;

type TagFilterProps = {
  selectedTag: TagFilterValue;
  onChange: (tag: TagFilterValue) => void;
};

function TagFilter({ selectedTag, onChange }: TagFilterProps) {
  return (
    <RadioGroup
      value={selectedTag ?? ""}
      onValueChange={(value) =>
        onChange(value === "" ? null : (value as TagFilterValue))
      }
      className="flex flex-wrap gap-4"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="" id="tag-all" className="bg-zinc-50" />
        <Label htmlFor="tag-all">すべて</Label>
      </div>

      {WORK_TAGS.map((tag) => (
        <div key={tag.id} className="flex items-center gap-2">
          <RadioGroupItem value={tag.id} id={tag.id} className="bg-zinc-50" />
          <Label htmlFor={tag.id}>{tag.label}</Label>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <RadioGroupItem value="untagged" id="tag-untagged" />
        <Label htmlFor="tag-untagged">未分類</Label>
      </div>
    </RadioGroup>
  );
}

function renderNextImage(
  {
    alt = "",
    title,
    sizes,
  }: {
    alt?: string;
    title?: string;
    sizes?: string;
  },
  {
    photo,
    width,
    height,
  }: {
    photo: AlbumPhoto;
    width: number;
    height: number;
  },
) {
  return (
    <div
      className="overflow-hidden rounded border border-zinc-100"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        quality={80}
        className="object-cover"
      />
    </div>
  );
}

type ArchivesAlbumProps = {
  photos: AlbumPhoto[];
  onClick: (index: number) => void;
};

function ArchivesAlbum({ photos, onClick }: ArchivesAlbumProps) {
  return (
    <div className="not-prose">
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={columns}
        breakpoints={[640, 768, 1024]}
        onClick={({ index }: { index: number }) => onClick(index)}

        render={{ image: renderNextImage }}
      />
    </div>
  );
}

export function formatArchiveDescription(archive: Archive): string {
  const parts: string[] = [];

  if (archive.title) {
    parts.push(`${archive.title}`);
  }

  if (archive.tags.length > 0) {
    parts.push(archive.tags.map((tag) => `#${tag}`).join(" "));
  }

  parts.push(archive.slug.substring(0, 4));

  return parts.join(" | ");
}

type ArchivesLightboxProps = {
  index: number;
  slides: AlbumPhoto[];
  onClose: () => void;
};

function ArchivesLightbox({ index, slides, onClose }: ArchivesLightboxProps) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      controller={{
        closeOnBackdropClick: true,
      }}
      slides={slides.map((photo) => ({
        src: photo.src,
        description: formatArchiveDescription(photo.archive),
      }))}
      render={{
        buttonZoom: () => null,
        iconClose: () => <XIcon />,
        iconPrev: () => <ChevronLeft />,
        iconNext: () => <ChevronRight />,
      }}
      plugins={[Zoom, Captions]}
    />
  );
}

type ArchivesGalleryProps = {
  archives: Archive[];
};

export function ArchivesGallery({ archives }: ArchivesGalleryProps) {
  const [groupByYear, setGroupByYear] = useState(false);
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState<AlbumPhoto[]>([]);
  const [selectedTag, setSelectedTag] = useState<TagFilterValue>(null);

  const filteredArchives = useMemo(() => {
    if (selectedTag === null) {
      return archives;
    }

    if (selectedTag === "untagged") {
      return archives.filter((item) => item.tags.length === 0);
    }

    return archives.filter((item) => item.tags.includes(selectedTag));
  }, [archives, selectedTag]);

  const photos = useMemo(
    () => mapArchivesToPhotos(filteredArchives),
    [filteredArchives],
  );

  const groups = useMemo(() => {
    const grouped = new Map<number, Archive[]>();

    for (const item of filteredArchives) {
      const year = Number(item.slug.substring(0, 4));

      if (!grouped.has(year)) {
        grouped.set(year, []);
      }

      grouped.get(year)!.push(item);
    }

    return [...grouped.entries()].sort((a, b) => b[0] - a[0]);
  }, [filteredArchives]);

  const openLightbox = (photos: AlbumPhoto[], index: number) => {
    setSlides(photos);
    setIndex(index);
  };

  return (
    <div className="flex flex-col gap-8">
      <GroupToggle groupByYear={groupByYear} onChange={setGroupByYear} />

      <details className="flex flex-col rounded-md bg-zinc-100 p-4">
        <summary className="-m-2 flex cursor-pointer list-none items-center gap-1 p-2 font-bold">
          <FilterIcon height={16} width={16} /> 絞り込み
        </summary>

        <div className="not-prose flex flex-col gap-4 p-4">
          <TagFilter selectedTag={selectedTag} onChange={setSelectedTag} />
        </div>
      </details>

      {!groupByYear ? (
        <ArchivesAlbum
          photos={photos}
          onClick={(index: number) => openLightbox(photos, index)}
        />
      ) : (
        <div>
          {groups.map(([year, groupArchives]) => {
            const groupPhotos = mapArchivesToPhotos(groupArchives);

            return (
              <section key={year}>
                <h2>{year}</h2>

                <ArchivesAlbum
                  photos={groupPhotos}
                  onClick={(index: number) => openLightbox(groupPhotos, index)}
                />
              </section>
            );
          })}
        </div>
      )}

      <ArchivesLightbox
        index={index}
        slides={slides}
        onClose={() => setIndex(-1)}
      />
    </div>
  );
}
