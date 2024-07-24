using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : Controller
{
    private readonly UserManager<AppUser> _userManager;
    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    // [HttpPost("register")]
    // public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    // {

    // }
}