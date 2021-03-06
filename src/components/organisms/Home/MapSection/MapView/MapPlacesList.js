import React, { useRef, useContext } from "react";
import clx from "classnames";
import "./MapPlacesList.scss";
import { MapPlacesContext, HoveredPlaceDispatchContext } from "../../../../pages/Home/MapSection/MapSection";

export default function MapPlacesList() {
    const asideRef = useRef(null);
    const places = useContext(MapPlacesContext);
    
    return (
        <aside id="mapAsideList" ref={asideRef}>
            <div className="aside-scroller-container">
                <div className="list-main-item">
                    <h3>Found 10 coffeeshops in your area</h3>
                </div>
                {places.map((place, index) =>
                    <ListItem
                        key={`list-place-${index}`}
                        className={`list-item-${index}`}
                        listNum={place.id}
                        title={place.title}
                        subtitle={place.subtitle}
                        schedule={place.schedule}
                        lat={place.lat}
                        lng={place.lng}
                    />
                )}
            </div>
        </aside>
    );
}

export function ListItem({ className, title, subtitle, schedule, listNum, lat, lng }) {
    const [onCenterChange, setPlaceKeyHovered] = useContext(HoveredPlaceDispatchContext);

    const handleMouseEnter = () => {
        setPlaceKeyHovered(listNum);
        onCenterChange([lat, lng]);
    }

    const handleMouseLeave = () => {
        setPlaceKeyHovered(0);
    }

    return (
        <div className={clx("list-item-box", className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h4>{listNum}. {title}</h4>
            <h5>{subtitle}</h5>
            <span>{schedule}</span>
        </div>
    );
}