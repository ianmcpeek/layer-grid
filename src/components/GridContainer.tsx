import './GridContainer.css';

function GridContainer({ children }: any) {
    return (
        <div className="grid-container">
            {children}
        </div>
    );
}

export default GridContainer;