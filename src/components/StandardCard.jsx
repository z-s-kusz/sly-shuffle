import { Show } from "solid-js";

export function StandardCard(props) {
    const weightLabel = () => {
        return `weight-${props.id}`;
    };
    const chances = () => {
        // TODO fix rounding - show decimals after
        // example issue weights I've seen: 1, 1, 4, percentages shown add to 101%
        return `${Math.round(props.weight / props.totalWeight * 100)} %`;
    }

    return (
        <div class="m-2 flex items-center">
            <input type="text" name={`name-${props.id}`} placeholder="enter name here..."
                value={props.name} onInput={props.onNameInput}
                class="input input-bordered input-lg w-full max-w-xs" />

            <Show when={props.showDealerControl}>
                <label for={weightLabel()} class="mx-2">Weight:</label>
                <input type="number" name={weightLabel()} min="0" max="10000"
                    value={props.weight} onInput={props.onWeightInput}
                    class="input w-full max-w-xs" />
                <span>{chances()}</span>
            </Show>
        </div>
    );
}
