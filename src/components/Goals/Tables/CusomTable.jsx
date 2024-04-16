import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

//custom table takes in the table name, heading as an array, rows as an array CollapsableRow, 
//and add dialog which is add button with a dialog form
export default function CustomTable({tableName, headings, rows, addDialog}){

        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            },
        }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
            border: 0,
            },
        }));
        console.log(headings);
    return (
        <TableContainer  component={Paper} sx={{mt:8}}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between', backgroundColor:'#233d4d', color:'white'}} >
                
                <Box>
                    <Typography
                        sx={{ flex: '1 1 100%', p:'20px' }}
                        variant="h4"
                        id="tableTitle">
                        {tableName}
                    </Typography>
                </Box>
                {addDialog}
            </Box>
            {rows.length===0? <Box sx={{p:10, display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='/images/noData.jpg' alt="" /></Box>:
            <Table>
                <TableHead>
                    <TableRow>
                            <StyledTableCell>
                            </StyledTableCell>
                        {headings.map((heading)=>
                            <StyledTableCell>
                                {heading}
                            </StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                       {rows.map((item)=>item)}
                </TableBody>
            </Table>}
        </TableContainer>
        
    )
}