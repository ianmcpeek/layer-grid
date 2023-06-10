import { useEffect } from "react";
import { Palette } from "../../applications/Gem_Thief/ColorPalette";
import useInput from "../../applications/Gem_Thief/lib/hooks/useInput";

const styles: any = {
    App: {
        fontFamily: 'Shrikhand',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Palette.Ash,
        outline: 0, overscrollBehavior: 'contain', touchAction: 'none'
    },
    Layout: {
        height: '100%'
    }
};

function MobileView({ header, footer, fnOnInput, fnOnSpace, children }: { fnOnInput: (fun: any) => void, fnOnSpace: () => void, header: any, footer?: any, children: any }) {
    const { buttonPressed, handlers, onKeyDownEvent, onKeyUpEvent } = useInput(fnOnInput, fnOnSpace);

    useEffect(() => {
        document.getElementById('mobile-view')?.focus();
    }, []);
    return (
        <div
            id="mobile-view"
            style={styles.App}
            tabIndex={0}
            onKeyDown={onKeyDownEvent}
            onKeyUp={onKeyUpEvent}
            {...handlers}
        >
            {header}
            <div style={styles.Layout}>
                {children}
            </div>
            {footer}
        </div>
    );
}

export default MobileView;