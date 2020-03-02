import React from "react";
import { Breakpoint } from "react-socks";
import { ComponentDescription } from "../../../organisms/Home/ComponenSlider/ComponentInfo";

export const DescriptionSwitchView = ({desktopText, mobileText, buttonText}) => {
    return (
        <>
            <Breakpoint customQuery="(max-width: 800px)">
                <ComponentDescription>{mobileText}</ComponentDescription>
            </Breakpoint>
            <Breakpoint customQuery="(min-width: 801px)">
                <ComponentDescription>{desktopText}</ComponentDescription>
                <button className="btn btn-primary">{buttonText}</button>
            </Breakpoint>
        </>
    );
}

export const ImageSwitchView = ({image, imgAlt, buttonText}) => {
    return (
        <>
            <Breakpoint customQuery="(max-width: 800px)" className="component-image-mobile">
                <img src={image} alt={`${imgAlt}`} />
                <button className="btn btn-primary">{buttonText}</button>
            </Breakpoint>
            <Breakpoint customQuery="(min-width: 801px)">
                <img src={image} alt={`${imgAlt}`} />
            </Breakpoint>
        </>
    );
}