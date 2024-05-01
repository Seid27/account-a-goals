import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';

//display an image when there is no data to show
function NoData({tableHeadings}) {
    return (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                        <TableCell align="center">{tableHeadings[0]}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Box sx={{p:10, display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                            <img width="200px" src='/images/noData.jpg' alt="" />
                        </Box>
                    </TableCell>
                </TableRow>
            
            </TableBody>
        </Table>
    )
}

export default function CustomTable(props) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    return(
        <TableContainer component={Paper} sx={{mb:5}}>
            {props.children.length===0? <NoData tableHeadings={props.tableHeadings}/>:
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                            <TableCell/>
                            {props.tableHeadings.map((heading,i)=>
                            (<TableCell key={i} align="center">{heading}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.children}
                    
                </TableBody>
            </Table>}
        </TableContainer>
    )
}