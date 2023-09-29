import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IncomeGraph from "./IncomeGraph.jsx"; // Changed from ExpenseGraph to IncomeGraph
import IncomeAdd from "./IncomeAdd.jsx"; // Changed from ExpenseAdd to IncomeAdd
import IncomeTable from "./IncomeTable.jsx"; // Changed from ExpenseTable to IncomeTable

export default function Income() {
  // Changed from Expense to Income
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
              <IncomeGraph /> {/* Changed from ExpenseGraph to IncomeGraph */}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <IncomeTable /> {/* Changed from ExpenseTable to IncomeTable */}
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
            <IncomeAdd /> {/* Changed from ExpenseAdd to IncomeAdd */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
