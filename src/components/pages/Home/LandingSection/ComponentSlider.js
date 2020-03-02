import React, { useState, useContext, useEffect } from "react";
import ComponentSlideOne from "./ComponentSlideOne";
import "./ComponentSlide.scss";
import ComponentSlideTwo from "./ComponentSlideTwo";
import ComponentSlideThree from "./ComponentThree";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { LinearProgress } from "@material-ui/core";
import StarbucksLogo from "../../../../assets/icons/starbucks_logo.svg";

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const components = [
    <ComponentSlideOne />,
    <ComponentSlideTwo />,
    <ComponentSlideThree />
];

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            transition: {
                duration: 1,
                delay: 2,
                ease: "easeInOut"
            }
        };
    },
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            transition: {
                duration: 0.4,
                delay: 0.4,
                ease: "easeInOut"
            }
        };
    }
};

export const SliderControls = ({counter}) => {
    const page = useContext(CountStateContext);
    const dispatch = useContext(CountDispatchContext);

    return (
        <div id="componentSliderControls">
            <div className="slider-control-actions">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" onClick={() => dispatch(1)}><ArrowBackIosRoundedIcon /></motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" onClick={() => dispatch(-1)}><ArrowForwardIosRoundedIcon /></motion.button>
            </div>
            <div className="slider-control-info">
                <LinearProgress
                    className="slider-progress-bar"
                    variant="determinate"
                    defaultValue={0}
                    value={counter}
                />
                <div className="slider-control-item-indicator">
                    <span>Next slide</span>
                    <span>0{page === 3 ? 1 : page + 1}</span>
                </div>
                <h3 className="slider-control-next-title">Our best coffee beans</h3>
                <p className="slider-control-next-description">See how we roast them</p>
            </div>
        </div>
    );
}

export const ActualSlideProgressBar = ({counter}) => {
    const page = useContext(CountStateContext);

    return (
        <div id="actualSlideTimer">
            <span className="actual-slider-number">0{page}</span>
            <LinearProgress
                    className="actual-slider-progress-bar"
                    variant="determinate"
                    defaultValue={0}
                    value={counter}
                />
        </div>
    );
}

export default function ComponentSlider() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [counter, setCounter] = useState(0);
    const imageIndex = wrap(0, components.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
        setCounter(0);
    };
    
    useEffect(() => {
        const timer =
            counter < 100 ? setInterval(() => setCounter(counter + 1), 10000) : paginate(1);;

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <section id="componentSlider">
            <img className="component-slider-waterprint" src={StarbucksLogo} alt="Starbuck logo grande" />
            <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial={"enter"}
                animate={"center"}
                exit={"exit"}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 200 },
                    opacity: { duration: 0.2 },
                    when: "beforeChildren"
                }}
                className="component-wrapper-animated"
            >
                <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                    {components[imageIndex]}
                </AnimatePresence>
            </motion.div>
            <CountStateContext.Provider value={imageIndex + 1}>
                <CountDispatchContext.Provider value={paginate}>
                    <ActualSlideProgressBar counter={counter}/>
                    <SliderControls counter={counter}/>
                </CountDispatchContext.Provider>
            </CountStateContext.Provider >
        </section>
    );
}