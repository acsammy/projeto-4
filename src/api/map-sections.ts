/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridContentProps } from "../components/GridContent";
import { GridImageElemetProps, GridImageProps } from "../components/GridImage";
import { GridTextElementProps, GridTextProps } from "../components/GridText";
import { GridTwoColumnsProps } from "../components/GridTwoColumns";
import { SectionProps } from "../templates/Home";

export const mapSections = (sections = [] as any): SectionProps[] => {
  return sections.map((section) => {
    if (section.__component === "section.section-two-columns") {
      return mapSectionTwoColumns(section);
    }
    if (section.__component === "section.section-content") {
      return mapSectionContent(section);
    }
    if (section.__component === "section.section-grid") {
      const { text_grid = [], image_grid = [] } = section;

      if (text_grid.length > 0) {
        return mapTextGrid(section);
      }

      if (image_grid.length > 0) {
        return mapImageGrid(section);
      }
    }

    return section;
  });
};

export const mapSectionTwoColumns = (
  section = {} as any
): GridTwoColumnsProps => {
  const {
    __component: component = "",
    title = "",
    description: text = "",
    metadata: { background = false, section_id: sectionId = "" } = false,
  } = section;

  const srcImg =
    section.image && section.image.data.attributes.url
      ? section.image.data.attributes.url
      : "";

  return {
    component,
    title,
    text,
    srcImg,
    background,
    sectionId,
  };
};

export const mapSectionContent = (section = {} as any): GridContentProps => {
  const {
    __component: component = "",
    title = "",
    content: html = "",
    metadata: { background = false, section_id: sectionId = "" } = false,
  } = section;

  return {
    component,
    title,
    background,
    sectionId,
    html,
  };
};

export const mapTextGrid = (section = {} as any): GridTextProps => {
  const {
    title = "",
    description = "",
    metadata: { background = false, section_id: sectionId = "" } = false,
    text_grid: grid = [],
  } = section;

  return {
    component: "section.section-grid-text",
    title,
    background,
    sectionId,
    description,
    grid: grid.map((text: any): GridTextElementProps => {
      const { title = "", description = "" } = text;
      return {
        title,
        description,
      };
    }),
  };
};

export const mapImageGrid = (section = {} as any): GridImageProps => {
  const {
    title = "",
    description = "",
    metadata: { background = false, section_id: sectionId = "" } = false,
    altText = "",
    image_grid: grid = [],
  } = section;

  return {
    component: "section.section-grid-image",
    title,
    background,
    sectionId,
    description,
    altText,
    grid: grid.map((img: any): GridImageElemetProps => {
      const { image: { data: dados = [] } = "" } = img;
      const { attributes: { url: srcImg = "" } = {} } = dados[0] || {};

      return {
        srcImg,
        altText,
      };
    }),
  };
};
