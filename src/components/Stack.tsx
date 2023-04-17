import React, { ElementType } from "react";
import { Box, type BoxProps } from './Polymorphic';
import styles from './stack.module.scss';


type StackProps = {
    direction?: 'vertical' | 'horizontal';
    spacing?: number;
};


const Stack = ({
    as,
    children,
    direction = 'vertical',
    spacing = 0,
    ...rest
}: BoxProps<ElementType, StackProps>) => {

    const stackChildren = React.Children.toArray(children);

    return (
        <Box as={as} {...rest} className={`${styles.stack} ${direction === 'vertical' ? styles.vertical : styles.horizontal} ${rest.className || ''}`} >
            {stackChildren.map((child, index) => {
                const isLastChild = index === stackChildren.length - 1;
                const marginStyle = direction === 'vertical' ? { marginBottom: isLastChild ? 0 : spacing } : { marginRight: isLastChild ? 0 : spacing };

                return (
                    <Box
                        key={index}
                        as="div"
                        style={marginStyle}
                        className={'stack-item'}
                    >
                        {child}
                    </Box>
                );
            })}
        </Box>
    );
};



export { Stack, type StackProps };

