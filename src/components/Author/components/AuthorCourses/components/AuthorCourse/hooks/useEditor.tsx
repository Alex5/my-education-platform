import { useCallback, useRef, useState } from 'react';

export const useEditor = () => {
    const [data, setData] = useState();
    const editorCore = useRef(null);

    const initialize = useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const save = async () => {
        // @ts-ignore
        return await editorCore.current.save();
    }

    return [save, initialize]
}