using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BL.Extensions.Enums;
using BL.Services;
using Entities.Enums;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.User;

namespace WordApp.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly BaseEntityService<UserEntity> _userService;
        public AuthenticationController(
            IMapper mapper,
           UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signinManager,
            BaseEntityService<UserEntity> userService
            ) : base(mapper)
        {
            this._userManager = userManager;
            this._signInManager = signinManager;
            this._userService = userService;
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            var createUserResult = await this._userManager.CreateAsync(user, model.Password);
            if (createUserResult.Succeeded)
            {
                var createdUser = await this._userManager.FindByEmailAsync(user.Email);
                await this._userManager.AddToRoleAsync(createdUser, nameof(UserType.Pupil));
                this._userService.CreateEntity(new UserEntity()
                {
                    UserType = UserType.Pupil,
                    Name = model.UserName,
                    Email = model.Email,
                });
                return Ok();
            }
            else
            {
                return BadRequest(createUserResult.Errors);
            }
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            var existingUser = await this._userManager.FindByNameAsync(userName) ?? await this._userManager.FindByEmailAsync(userName);
            if (existingUser == null)
            {
                return BadRequest("No user with specified email or name was found");
            }

            var loginResult = await this._signInManager.PasswordSignInAsync(existingUser, password, false, false);

            if (loginResult.Succeeded)
            {
                var userRoles = await this._userManager.GetRolesAsync(existingUser);

                var user = this._userService.GetEntity(e => e.Name == userName || e.Email == userName);

                if (user == null)
                {
                    return Forbid("No user registered with specified email or user name.");
                }

                return Ok(new UserLoginModel()
                {
                    Id = user.Id,
                    Name = existingUser.UserName,
                    UserType = EnumExtension.GetEnumByStringValue<UserType>(userRoles.First()),
                });
            }
            else
            {
                return Forbid("Authorization Error");
            }
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult LoginWithGoogle(string provider, string returnUrl)
        {
            var properties = this._signInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            return Challenge(properties, provider);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetLoginGoogleData()
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return BadRequest("No appropriate login info");
            }

            var principalEmail = info.Principal.Claims.FirstOrDefault(cl => cl.Type == ClaimTypes.Email);

            if (principalEmail == null)
            {
                return BadRequest("No user email provided in authorization data");
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                var googleUser = await this._userManager.FindByEmailAsync(principalEmail.Value);
                var userRoles = await this._userManager.GetRolesAsync(googleUser);

                var user = this._userService.GetEntity(e => e.Email == principalEmail.Value);

                if (user == null)
                {
                    return Forbid("No user registered with specified email or user name.");
                }

                var model = new UserLoginModel()
                {
                    Id = user.Id,
                    Name = googleUser.UserName,
                    UserType = EnumExtension.GetEnumByStringValue<UserType>(userRoles.First())
                };
                return Ok(model);
            }
            else
            {
                var loginModel = new UserRegistrationModel()
                {
                    UserName = principalEmail.Value,
                    Email = principalEmail.Value
                };
                return Ok(loginModel);
            }
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigrmGoogleLogin(string email)
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                throw new ApplicationException("Error loading external login information during confirmation.");
            }
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
               var createdEntity = this._userService.CreateEntity(new UserEntity()
                {
                    Name = email,
                    Email = email,
                    UserType = UserType.Pupil,
                    UserProfile = new UserProfileEntity(),
                });

                result = await _userManager.AddLoginAsync(user, info);
                if (result.Succeeded)
                {
                    var googleUser = await this._userManager.FindByEmailAsync(email);
                    await this._userManager.AddToRoleAsync(googleUser, nameof(UserType.Pupil));
                    await _signInManager.SignInAsync(user, isPersistent: false);

                    var loginModel = new UserLoginModel()
                    {
                        Id = createdEntity.Id,
                        Name = email,
                        UserType = UserType.Pupil,
                    };

                    return Ok(loginModel);
                }
            }
            return BadRequest(result.Errors);
        }
    }
}
