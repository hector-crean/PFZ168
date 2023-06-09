import { Ref, SVGProps, forwardRef, memo } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
}
const SvgComponent = (
    {
        title,
        titleId,
        desc,
        descId,
        ...props
    }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 999 409"
        width="1em"
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={descId}
        {...props}
    >
        {desc ? <desc id={descId}>{desc}</desc> : null}
        {title ? <title id={titleId}>{title}</title> : null}
        <path
            d="M19.486 163.83c11.8-43.139 60.942-53.405 106.187-54.674 37.194-1.042 78.666 3.876 78.666 3.876l-19.486 71.243s-41.472-4.918-78.666-3.875C60.942 181.668 11.799 191.935 0 235.073Z"
            style={{
                fill: "#0190ff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: ".20077688px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
            }}
        />
        <path
            d="M645.576 87.98c-59.564 0-74.824 57.648-83.363 88.87l-63.627 232.584h37.121l56.412-206.23h38.555l-25.666 93.84h37.12l30.782-112.538h-75.674c3.878-14.185 8.013-29.296 11.383-41.617 6.224-22.756 16.39-39.28 31.176-38.725 16.34.614 8.025 11.344 5.787 19.525-3.096 11.319 5.262 22.7 19.906 22.7 31.809 0 39.653-58.409-19.912-58.409zm-210.574 40.698v.002l-46.05 168.365h38.698l17.053-62.348h33.615c37.092 0 61.708-20.471 68.364-48.927 6.215-26.57-9.304-57.092-50.868-57.092h-60.812zm33.281 19.812h14.88c15.577 0 27.937 12.47 24.952 34.172-2.766 20.117-24.611 32.176-43.658 32.176h-14.322zm366.977 32.608c-32.54 0-56.012 27.993-61.645 55.968-5.413 26.883 10.004 62.608 52.447 62.608 30.167 0 45.338-13.283 45.338-13.283l-6.943-17.14c0 .001-12.682 10.323-30.353 10.323-17.672 0-28.758-13.949-26.305-36.178h72.162c5.159-13.09 7.983-62.298-44.701-62.298zm143.84 1.513c-24.202 0-38.471 24.993-38.471 24.993l6.316-23.096h-37.12l-30.782 112.537h37.121s8.94-32.88 13.488-49.295c7.023-25.66 21.346-41.727 28.233-42.385 7.958-.76 7.196 18.416 22.717 18.416 23.544 0 28.622-41.17-1.498-41.17zm-292.204 1.897-5.115 18.699h47.053l-73.97 93.838H759.32l5.114-18.7h-53.079l73.97-93.837zm148.225 15.172v.002c20.183 0 15.59 26.648 15.59 26.648l-40.432-.094s6.706-26.556 24.842-26.556zM301.842 297.307c-133.12-8.301-287.816-76.965-282.356-133.477L1.12 230.98c-5.572 57.658 137.931 126.112 281.236 137.57Z"
            style={{
                fill: "#2b01be",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: ".20077688px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
            }}
        />
        <path
            d="M350.219 204.72c-11.8 43.14-60.942 53.406-106.187 54.674-37.194 1.043-78.665-3.876-78.665-3.876l19.486-71.243s41.47 4.918 78.666 3.876c45.244-1.269 94.387-11.535 106.186-54.674z"
            style={{
                fill: "#2b01be",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: ".20077688px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
            }}
        />
        <path
            d="M67.863 71.243c133.12 8.301 287.816 76.966 282.356 133.478l18.366-67.151C374.156 79.912 230.654 11.458 87.35 0Z"
            style={{
                fill: "#0190ff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: ".20077688px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
            }}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
