import {useState, KeyboardEvent, useEffect} from "react";
import styles from './Select.module.css'

type ItemsType = {
    title: string,
    value: any,
}


type SelectPropsType = {
    value: any,
    onChange: (value: any) => void,
    items: ItemsType[],
}


export const Select = (props: SelectPropsType) => {
    const [active, setActive] = useState(false)
    const [hoveredElementValue, setHoveredElementValue] = useState(props.value)

    const selectedItems = props.items.find(i => i.value === props.value)
    const hoveredItem = props.items.find(i => i.value === hoveredElementValue)

    useEffect(() => {
        setHoveredElementValue(props.value)
    }, [props.value])

    const toggleItems = () => setActive(!active)


    const handleSelect = (value: any) => {
        props.onChange(value);
        setActive(false);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].value === hoveredElementValue) {
                    const pretendentElement = e.key === "ArrowDown" ? props.items[i + 1] : props.items[i - 1];

                    if (pretendentElement) {
                        props.onChange(pretendentElement.value);
                        break;
                    }
                }
            }

        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false);
        }

    }

    const showOptions = () => {
        setActive(!active);

    }

    return (
        <div className={styles.container}>

            <div className={styles.select} onKeyUp={onKeyUp} tabIndex={0}>


                <span className={styles.main} onClick={toggleItems}>{selectedItems && selectedItems.title}</span>
                <span onClick={showOptions} className={styles.arrow}>☟</span>

                {
                    active &&
                    <div className={styles.items}>
                        {props.items.map(i =>
                            <div
                                onMouseEnter={() => setHoveredElementValue(i.value)}
                                className={styles.item + " " + (hoveredItem === i ? styles.selected : "")}
                                key={i.value}
                                onClick={() => handleSelect(i.value)}>
                                {i.title}
                            </div>)}
                    </div>
                }
            </div>
        </div>
    );
};




