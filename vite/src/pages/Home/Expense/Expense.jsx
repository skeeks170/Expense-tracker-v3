import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ExpenseGraph from "./ExpenseGraph.jsx";
import ExpenseAdd from "./ExpenseAdd.jsx";
import ExpenseTable from "./ExpenseTable.jsx";

export default function Expense() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid container spacing={1} xs={8}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
              <ExpenseGraph />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <ExpenseTable />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 650,
            }}
          >
            <ExpenseAdd />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
