import * as React from 'react';

/**
 * Utility function for creating SVG icons.
 * This utility was strongly inspired by Material UI.
 *
 * @param {React.ReactNode} path - The SVG path or content of the icon.
 * @param {string} displayName - The display name for the icon component.
 * @returns {React.Component} A memoized SVG icon component.
 * @description All icons must adhere to the same viewbox of 24x24 for consistency in rendering.
 */
export function createSvgIcon(path: React.ReactNode, displayName: string) {
  /**
   * Icon component for rendering SVG icons.
   *
   * @param {React.SVGProps<SVGSVGElement>} props - Props to be passed to the SVG element.
   * @param {React.ForwardedRef<SVGSVGElement>} ref - Ref for the SVG element.
   * @returns {JSX.Element} SVG icon component.
   */
  function Component(
    props: React.SVGProps<SVGSVGElement>,
    ref: React.ForwardedRef<SVGSVGElement>,
  ) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        data-testid={`${displayName}-icon`}
        ref={ref}
        aria-hidden
        {...props}
      >
        {path}
      </svg>
    );
  }

  Component.displayName = `${displayName}-icon`;

  return React.memo(React.forwardRef(Component));
}