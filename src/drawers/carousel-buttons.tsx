import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react'
import {EmblaCarouselType} from 'embla-carousel'
import {Button} from "@chakra-ui/react";
import {ChevronLeft, ChevronRight} from "react-feather";

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}

type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const PrevButton: React.FC<PropType> = (props) => {
    const {children, ...restProps} = props
    return (
        <Button {...restProps} height={50} width={50} rounded={'full'} autoFocus={false}>
            <ChevronLeft/>
        </Button>
    )
}

export const NextButton: React.FC<PropType> = (props) => {
    const {children, ...restProps} = props
    return (
        <Button {...restProps} height={50} width={50} rounded={'full'} autoFocus={false}>
            <ChevronRight/>
        </Button>
    )
}
