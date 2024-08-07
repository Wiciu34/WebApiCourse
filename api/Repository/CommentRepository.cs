using api.Data;
using api.Dtos.Comment;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDBContext _context;
    public CommentRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<List<Comment>> GetAllCommentsAsync()
    {
        return await _context.Comments.Include(a => a.AppUser).ToListAsync();
    }

    public Task<Comment?> GetByIdAsync(int id)
    {
        return _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Comment> CreateAsync(Comment comment)
    {
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();
        
        return comment;
    }

    public async Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto commentDto)
    {
        var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        if(comment == null)
        {
            return null;
        }

        comment.Title = commentDto.Title;
        comment.Content = commentDto.Content;

        await _context.SaveChangesAsync();

        return comment;
    }

    public async Task<Comment?> DeleteAsync(int id)
    {
        var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id==id);

        if(comment == null)
        {
            return null;
        }

        _context.Comments.Remove(comment);

        await _context.SaveChangesAsync();

        return comment;
    }
}