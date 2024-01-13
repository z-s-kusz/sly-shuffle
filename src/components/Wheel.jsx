import { For } from "solid-js";

export function Wheel(props) {
    return (
        <>
            <ul>
                <For each={props.inputs}>
                    {(input) => {
                        return <li>{input.name}</li>
                    }}
                </For>
            </ul>
            <button class="btn btn-primary">Spin</button>
        </>
    );
}
