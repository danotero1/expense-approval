using Microsoft.EntityFrameworkCore;
using Approval.Api.Models;
namespace Approval.Api.Data;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<ExpenseRequest> ExpenseRequest => Set<ExpenseRequest>();
}