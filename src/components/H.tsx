import { ElementType, ReactElement, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

type HeaderTag = `h${1 | 2 | 3 | 4 | 5 | 6}`


type HeaderProps<T extends (ElementType & HeaderTag)> = React.ComponentPropsWithoutRef<T> & {
    as: T;
    children: ReactNode
};

type HeaderComponent = <T extends (ElementType & HeaderTag) >(
    props: HeaderProps<T>
) => ReactElement;

const H: HeaderComponent = <T extends (ElementType & HeaderTag)>({ as, children, ...rest }: HeaderProps<T>) => {
    const Element: ElementType = as;

    return <Element id={uuidv4()} {...rest}>{children}</Element>;
};



export { H };

