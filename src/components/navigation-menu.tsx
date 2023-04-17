"use client";
import { Node, Tree } from '@/models/tree';
import { CaretDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import Link from 'next/link';
import { ForwardedRef, HTMLAttributes, forwardRef } from "react";
import styles from './navigation-menu.module.scss';

interface ListItemProps extends HTMLAttributes<HTMLAnchorElement> {
    className?: string;
    title: string;
    href: string;
    children: React.ReactNode;
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, children, title, ...props }: ListItemProps, forwardedRef: ForwardedRef<HTMLAnchorElement>) => (
        <li>
            <NavigationMenu.Link asChild>
                <Link className={classNames(`${styles.ListItemLink}, ${className}`)} {...props} ref={forwardedRef}>
                    <div className={styles.ListItemHeading}>{title}</div>
                    <p className={styles.ListItemText}>{children}</p>
                </Link>
            </NavigationMenu.Link>
        </li>
    )
);
ListItem.displayName = 'ListItem'


interface NavigationMenuImplProps {
    nodes: Tree;
    activePathname: string;
}

const NavigationMenuImpl = ({ nodes, activePathname }: NavigationMenuImplProps) => {

    const renderTree = (node: Node) => {
        switch (node.kind) {
            case 'leaf':
                return (
                    <ListItem href={node.path} title={node.name}>
                    </ListItem>
                );
            case 'branch':
                return (
                    <ul className={`${styles.List} ${styles.many}`}>
                        {node.children.map(node => renderTree(node))}
                    </ul>
                );

        }

    }

    return (
        <NavigationMenu.Root className={styles.NavigationMenuRoot}>


            <NavigationMenu.List className={styles.NavigationMenuList}>
                <NavigationMenu.Item>
                    <NavigationMenu.Link className={styles.NavigationMenuLink} asChild={true}>
                        <Link href="/overview">Overview</Link>
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <hr />

                {nodes.map((childNode, i) => (<NavigationMenu.Item key={`top-level-navigation-item-${i}`}>
                    <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                        {childNode.name} <CaretDownIcon className={styles.CaretDown} aria-hidden />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={styles.NavigationMenuContent}>
                        <ul className={`${styles.List} ${styles.one}`}>
                            <li style={{ gridRow: 'span 3' }}>
                                <NavigationMenu.Link asChild className={styles.NavigationMenuLink}>
                                    <Link className={styles.Callout} href={childNode.path}>
                                        <img style={{ width: '100%' }} src={childNode.heroImage} />
                                        <p className={styles.CalloutText}>{childNode.name}</p>
                                    </Link>
                                </NavigationMenu.Link>
                            </li>
                            {renderTree(childNode)}


                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                ))}

                <NavigationMenu.Indicator className={styles.NavigationMenuIndicator}>
                    <div className={styles.Arrow} />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>



            <div className={styles.ViewportPosition}>
                <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
            </div>
        </NavigationMenu.Root>
    );
};



export { NavigationMenuImpl };
