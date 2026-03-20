using Microsoft.AspNetCore.Mvc;
using Approval.Api.Data;
using Approval.Api.Models;
using Approval.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Approval.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenseRequestController : ControllerBase
{
    private readonly AppDbContext _context;
    public ExpenseRequestController(AppDbContext context) { _context = context; }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExpenseRequest>>> GetAll(
        [FromQuery] string? status,
        [FromQuery] string? category,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate)
    {
        var query = _context.ExpenseRequest.AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(x => x.Status == status);
        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(x => x.Category == category);
        if (startDate.HasValue)
            query = query.Where(x => x.ExpensDate >= startDate.Value);
        if (endDate.HasValue)
            query = query.Where(x => x.ExpensDate <= endDate.Value);

        var result = await query.ToListAsync();
       
        return Ok(result);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ExpenseRequest>> GetById(int id)
    {
        var expense = await _context.ExpenseRequest.FindAsync(id);
        if (expense == null)
            return NotFound();
        return Ok(expense);
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseRequest>> Create(ExpenseRequest request)
    {
        // Inicio de validaciones 

        //validación monto mayor
        if (request.Amount <= 0)
            return BadRequest("El valor Tiene que ser mayor a cero");

        // validacion fecha
        if (request.ExpensDate > DateTime.UtcNow)
            return BadRequest("La Fecha no puede sobrepasar la fecha actual");

        // campo obligatorio
        if (string.IsNullOrWhiteSpace(request.Category))
            return BadRequest("Categoria es obligatoria");


        // Fin de validaciones 

        request.Status = "Pending";
        request.Created = DateTime.UtcNow;
        _context.ExpenseRequest.Add(request);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = request.Id }, request);

    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, ExpenseRequest updatedRequest)
    {
        var existing = await _context.ExpenseRequest.FindAsync(id);

        //Inicio de validaciones

        if (existing == null)
            return NotFound("Solicitud no encontrada");

        if (existing.Status != "Pending")
            return BadRequest("Solo se pueden editar solicitudes en estado Pendiente");

        if (updatedRequest.Amount <= 0)
            return BadRequest("El valor debe ser mayor a cero");

        if (updatedRequest.ExpensDate > DateTime.UtcNow)
            return BadRequest("La Fecha no puede sobrepasar la fecha actual");

        if (string.IsNullOrWhiteSpace(updatedRequest.Category))
            return BadRequest("La categoría es obligatoria");


        //Fin validaciones
        existing.Category = updatedRequest.Category;
        existing.Description = updatedRequest.Description;
        existing.Amount = updatedRequest.Amount;
        existing.ExpensDate = updatedRequest.ExpensDate;
        existing.RequestBy = updatedRequest.RequestBy;

        await _context.SaveChangesAsync();
        return NoContent();


    }
    [HttpPut("{id}/approve")]
    public async Task<ActionResult> Approve(int id)
    {
        var existing = await _context.ExpenseRequest.FindAsync(id);

        //Incio validaciones
        if (existing == null)
            return NotFound("Solicitud no encontrada");

        if (existing.Status != "Pending")
            return BadRequest("Solo se pueden aprobar solicitudes en estado Pendiente");

        //Fin validaciones
        existing.Status = "Approved";
        existing.DecisionDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}/reject")]
    public async Task<ActionResult> Reject(int id)
    {
        var existing = await _context.ExpenseRequest.FindAsync(id);

        //Incio validaciones
        if (existing == null)
            return NotFound("Solicitud no encontrada");
        if (existing.Status != "Pending")
            return BadRequest("Solo se pueden rechazar solicitudes en estado Pendiente");

        //Fin validaciones
        existing.Status = "Rejected";
        existing.DecisionDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return NoContent();
    }



    // metricas endpoint
    [HttpGet("metrics")]
    public async Task<ActionResult<MetriscDto>> GetMetrics()
    {
        var total = await _context.ExpenseRequest.CountAsync();
        var approved = await _context.ExpenseRequest
            .CountAsync(x => x.Status == "Approved");
        var rejected = await _context.ExpenseRequest
            .CountAsync(x => x.Status == "Rejected");
        var totalApprovedAmount = await _context.ExpenseRequest
            .Where(x => x.Status == "Approved")
            .SumAsync(x => (double)x.Amount);
        var metrics = new MetriscDto
        {
            Total = total,
            Approved = approved,
            Rejected = rejected,
            TotalApprovedAmount = totalApprovedAmount
        };
        return Ok(metrics);
    }


}