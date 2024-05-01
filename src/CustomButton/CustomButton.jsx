//this functional component acts as a wrapper button
//it will wrap a MUI Button or IconButton and applies on click handler that is passed from DeleteDialog
//The reason for the wrapper is to allow reasuability of the dialog for either a regular MUI button or 
//IconButton.
export default function CustomButton(props) {
    const {children, ...rootDOMAttributes}= props; 
    return(
        //...rootDOMAttributes passed as props will be applied to the div
        // eg. https://stackoverflow.com/questions/28268835/react-onclick-event-on-component
        <div {...rootDOMAttributes}>
            {children}
        </div>
    )
    
}