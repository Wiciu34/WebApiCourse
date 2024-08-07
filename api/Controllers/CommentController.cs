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
    public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager)
    {
        _commentRepository = commentRepository;
        _stockRepository = stockRepository;
        _userManager = userManager;
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

    [HttpPost("{stockId:int}")]
    public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if(!await _stockRepository.StockExists(stockId))
        {
            return BadRequest("Stock does not exist");
        }

        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var comment = commentDto.ToCommentFromCreateDto(stockId);
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