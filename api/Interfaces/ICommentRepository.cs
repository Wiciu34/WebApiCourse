using api.Dtos.Comment;
using api.Models;

namespace api.Interfaces;

public interface ICommentRepository
{
    Task<List<Comment>> GetAllCommentsAsync();
    Task<Comment?> GetByIdAsync(int id);
    Task<Comment> CreateAsync(Comment comment);
    Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto commentDto);
    Task<Comment?> DeleteAsync(int id);
}