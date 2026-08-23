import { type ElementType, type JSX } from "react";
import { Loader } from "..";
import { cn } from "../../lib/cn";
import styles from './Button.module.css';
import type { ButtonProps } from "./Button.props";
import ArrowIcon from './arrow.svg?react';


const defaultElement = 'button';

export const Button = <E extends ElementType = typeof defaultElement>({ 
    as,
    className, 
    children, 
    variant='primary', 
    size='m',
    isLoading,
    arrow='none',
    noBg,
    disabled,
    iconSize=36,
    style,
    radius,
    disableJump,
    ref,
    ...props
}: ButtonProps<E>): JSX.Element => {

    const Component = as || defaultElement;

    const customStyle = {
        ...(size === 'icon' && { width: iconSize, height: iconSize }),
        ...(radius && { borderRadius: typeof radius === 'number' ? `${radius}px` : radius }),
        ...style
    };

    const isDisabled = disabled || isLoading;

    return (
        <Component
            ref={ref}
            className={cn(
                styles.button,
                styles[variant],
                styles[size],
                { 
                    [styles.isLoading]: isLoading,
                    [styles.noBg]: noBg,
                    [styles.noJump]: disableJump
                },
                className
            )}
            style={customStyle}
            disabled={Component === 'button' ? isDisabled : undefined}
            aria-disabled={Component !== 'button' && isDisabled ? true : undefined}
            {...props}
        >
            {isLoading ? <Loader size="s" /> : children}

            {arrow !== 'none' && (
                <span className={cn(styles.arrow, {
                    [styles.right]: arrow === 'right',
                    [styles.rightUp]: arrow === 'right-up',
                })}>
                    <ArrowIcon />
                </span>
            )}
        </Component>
    )
}