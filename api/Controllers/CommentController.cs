using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/comment")]
[ApiController]
public class CommentController :ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    private readonly IStockRepository _stockRepository;
    public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository)
    {
        _commentRepository = commentRepository;
        _stockRepository = stockRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentRepository.GetAllCommentsAsync();

        var commentsDto = comments.Select(c => c.ToCommentDto());

        return Ok(commentsDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var comment = await _commentRepository.GetByIdAsync(id);

        if(comment == null)
        {
            return NotFound();
        }

        return Ok(comment.ToCommentDto());
    }

    [HttpPost("{stockId}")]
    public async Task<IActionResult> Post([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto)
    {
        if(!await _stockRepository.StockExists(stockId))
        {
            return BadRequest("Stock does not exist");
        }

        var comment = commentDto.ToCommentFromCreateDto(stockId);

        await _commentRepository.CreateAsync(comment);

        return CreatedAtAction(nameof(GetById), new {id = comment.Id}, comment.ToCommentDto());
    }


}