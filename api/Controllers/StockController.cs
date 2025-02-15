using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/stock")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly IStockRepository _stockRepository;
    public StockController(IStockRepository stockRepository)
    {
        _stockRepository = stockRepository;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
        var stocks = await _stockRepository.GetAllStocksAsync(query);

        var stocksDto = stocks.Select(s => s.ToStockDto());

        return Ok(stocksDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var stock = await _stockRepository.GetStockByIdAsync(id);

        if (stock == null)
        {
            return NotFound();
        }

        return Ok(stock.ToStockDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStockRquestDto stockDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var stockModel = stockDto.ToStockFromCreateDTO();

        await _stockRepository.CreateAsync(stockModel);

        return CreatedAtAction(nameof(GetById), new {id = stockModel.Id}, stockModel.ToStockDto());
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto stockDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var stockModel = await _stockRepository.UpdateAsync(id, stockDto);

        if (stockModel == null)
        {
            return NotFound();
        }

        return Ok(stockModel.ToStockDto());
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var stock = await _stockRepository.DeleteAsync(id);

        if(stock == null)
        {
            return NotFound(); 
        }

        return NoContent();
    }
}