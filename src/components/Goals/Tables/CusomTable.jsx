import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export default function CustomTable({tableName, headings, rows, addDialog}){
    return (
        <TableContainer component={Paper}>
            {addDialog}
            <Box>
                <Typography
                    sx={{ flex: '1 1 100%', p:'20px' }}
                    variant="h4"
                    id="tableTitle">
                    {tableName}
                </Typography>
            </Box>
            {rows.length===0? <Box sx={{display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='/images/noData.jpg' alt="" /></Box>:
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {headings.map((heading)=>
                            <TableCell>
                                {heading}
                            </TableCell>
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