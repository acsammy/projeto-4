import React from "react";
import { Heading } from "../Heading";
import { SectionBackground } from "../SectionBackground/index";
import { TextComponent } from "../TextComponent";
import * as Styled from "./styles";

export type GridImageElemetProps = {
  altText: string;
  srcImg: string;
};

export type GridImageProps = {
  title: string;
  description: string;
  grid?: GridImageElemetProps[];
  altText: string;
  background?: boolean;
  sectionId?: string;
  component?: string;
};

export const GridImage = ({
  title,
  description,
  grid,
  background = false,
  sectionId = "",
}: GridImageProps) => {
  return (
    <SectionBackground background={background} sectionId={sectionId}>
      <Styled.Container>
        <Heading size="huge" uppercase colorDark={!background} as="h2">
          {title}
        </Heading>
        <TextComponent>{description}</TextComponent>
        <Styled.Grid>
          {grid.map((el) => (
            <Styled.GridElement key={`${el.srcImg}${el.altText}`}>
              <Styled.Image src={el.srcImg} alt={el.altText} />
            </Styled.GridElement>
          ))}
        </Styled.Grid>
      </Styled.Container>
    </SectionBackground>
  );
};
