import { useEffect, useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { setIsSidePaneOpen } from '../store/globalUIStates';
import { useSelector, useDispatch } from 'react-redux';

const PanelSplitter = ({ children: [left, right] }) => {
    const leftPanelRef = useRef(null);
    const { isSidePaneOpen } = useSelector((store) => store.globalUIStates);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSidePaneOpen) {
            leftPanelRef.current.expand();
        } else {
            leftPanelRef.current.collapse();
        }
    }, [isSidePaneOpen]);

    return (
        <PanelGroup direction="horizontal" style={{ height: '100%' }}>
            <Panel
                ref={leftPanelRef}
                minSize={20}
                maxSize={40}
                defaultSize={isSidePaneOpen ? 20 : 0}
                collapsible
                collapsedSize={0}
                onExpand={() => dispatch(setIsSidePaneOpen(true))}
                onCollapse={() => dispatch(setIsSidePaneOpen(false))}
            >
                {left}
            </Panel>
            <PanelResizeHandle style={{ width: isSidePaneOpen ? '4px' : 0 }} />
            <Panel style={{ position: 'relative' }}>{right}</Panel>
        </PanelGroup>
    );
};

export default PanelSplitter;
