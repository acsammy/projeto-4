/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuLinkProps } from "../components/MenuLink";
import { PageData } from "../templates/Home";

export const mapMenu = (menu = {} as any): PageData["menu"] => {
  const {
    open_in_new_tab: newTab = false,
    logo_text: text = "",
    logo_link: link = "",
    menu_links: links = [],
  } = menu;

  const srcImg =
    menu.logo && menu.logo.data.attributes.url
      ? menu.logo.data.attributes.url
      : "";

  return {
    newTab,
    text,
    link,
    srcImg,
    links: mapMenuLinks(links),
  };
};

export const mapMenuLinks = (links = []): MenuLinkProps[] => {
  return links.map((item): MenuLinkProps => {
    const {
      open_in_new_tab: newTab = false,
      link_text: children = "nao passou",
      url: link = "",
    } = item;

    return {
      newTab,
      children,
      link,
    };
  });
};
