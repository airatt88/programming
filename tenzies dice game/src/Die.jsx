export default function Die(props) {
    const styles = {
        boxShadow: props.isHeld ? "0 0 0 0.5rem rgb(28, 250, 28)" : "0 0 0 0"
    }

    return (
        <button 
            style={styles}
            key={props.id}
            onClick={props.hold}
            className={`die-${props.value}`}
            >
        {/* {props.value} */}
        </button>
    )
}