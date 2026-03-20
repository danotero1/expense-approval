namespace Approval.Api.Models;

public class ExpenseRequest
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime ExpensDate { get; set; }
    public string RequestBy { get; set; }  = string.Empty;
    public string Status {  get; set; } = "Pending";
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime DecisionDate { get; set; }



}