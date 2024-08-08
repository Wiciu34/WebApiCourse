using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/comment")]
[ApiController]
public class CommentController :ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    private readonly IStockRepository _stockRepository;
    private readonly UserManager<AppUser> _userManager;
    private readonly IFMPService _fmpService;
    public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager, IFMPService fmpService)
    {
        _commentRepository = commentRepository;
        _stockRepository = stockRepository;
        _userManager = userManager;
        _fmpService = fmpService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentRepository.GetAllCommentsAsync();

        var commentsDto = comments.Select(c => c.ToCommentDto());

        return Ok(commentsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var comment = await _commentRepository.GetByIdAsync(id);

        if(comment == null)
        {
            return NotFound("Comment was not found");
        }

        return Ok(comment.ToCommentDto());
    }

    [HttpPost]
    [Route("{symbol:alpha}")]
    public async Task<IActionResult> Create([FromRoute] string symbol, [FromBody] CreateCommentRequestDto commentDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var stock = await _stockRepository.GetStockBySymbolAsync(symbol);

        if(stock == null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);

            if (stock == null)
            {
                return BadRequest("Stock does not exist");
            }
            else
            {
                await _stockRepository.CreateAsync(stock);
            }
        }

        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var comment = commentDto.ToCommentFromCreateDto(stock.Id);
        comment.AppUserId = appUser.Id;
        
        await _commentRepository.CreateAsync(comment);

        return CreatedAtAction(nameof(GetById), new {id = comment.Id}, comment.ToCommentDto());
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto commentDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var comment = await _commentRepository.UpdateAsync(id, commentDto);

        if(comment == null)
        {
            return NotFound("Comment was not found");
        }

        return Ok(comment.ToCommentDto());
    } 

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var comment = await _commentRepository.DeleteAsync(id);

        if(comment == null)
        {
            return NotFound("Comment was not found");
        }

        return NoContent();
    }
}