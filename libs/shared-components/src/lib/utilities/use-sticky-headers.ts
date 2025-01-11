import React from 'react';

export const useStickyHeaders = ({
    containerRef,
    topOffset,
    isDoneLoading,
}: {
    containerRef: React.RefObject<HTMLElement | null>;
    topOffset: number;
    isDoneLoading: boolean;
}) => {
    React.useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            // Find the required elements
            const virtualScroller = container.querySelector('.MuiDataGrid-virtualScroller') as HTMLElement;
            const topContainer = container.querySelector('.MuiDataGrid-topContainer') as HTMLElement;

            console.log(container, virtualScroller, topContainer);
            if (!virtualScroller || !topContainer) return;

            // Get the virtual scroller's bounds
            const scrollerRect = virtualScroller.getBoundingClientRect();
            const windowTop = window.scrollY + topOffset;
            const scrollerTop = scrollerRect.top + window.scrollY;
            const scrollerBottom = scrollerTop + scrollerRect.height;

            // Check if window top is within the virtualScroller's height
            if (windowTop >= scrollerTop && windowTop <= scrollerBottom) {
                const difference = windowTop - scrollerTop;
                topContainer.style.top = `${difference}px`;
                topContainer.style.boxShadow = '0 4px 8px -2px rgba(0, 0, 0, 0.2)';
            } else {
                topContainer.style.top = '';
                topContainer.style.boxShadow = 'none'; // Remove shadow when not sticky
            }
        };

        // Add scroll event listeners
        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef, topOffset, isDoneLoading]);
};
