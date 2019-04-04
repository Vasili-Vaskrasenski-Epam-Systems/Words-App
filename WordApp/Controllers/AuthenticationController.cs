using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BL.Extensions.Enums;
using Entities.Enums;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WordApp.Infrastructure.TokenGenerators;
using WordApp.Models.User;

namespace WordApp.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticationController(
            IMapper mapper,
           UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signinManager) : base(mapper)
        {
            this._userManager = userManager;
            this._signInManager = signinManager;
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
                return Ok(new UserLoginModel()
                {
                    Id = Guid.Parse(existingUser.Id),
                    Name = existingUser.UserName,
                    UserType = EnumExtension.GetEnumByStringValue<UserType>(userRoles.First()),
                });
            }
            else
            {
                return BadRequest("Authorization Error");
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
                var model = new UserLoginModel()
                {
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
                result = await _userManager.AddLoginAsync(user, info);
                if (result.Succeeded)
                {
                    var googleUser = await this._userManager.FindByEmailAsync(email);
                    await this._userManager.AddToRoleAsync(googleUser, nameof(UserType.Pupil));
                    await _signInManager.SignInAsync(user, isPersistent: false);

                    var loginModel = new UserLoginModel()
                    {
                        Name = email,
                        UserType = UserType.Pupil,
                    };

                    return Ok(loginModel);
                }
            }
            return BadRequest(result.Errors);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult LoginViaGoogle(string email, string password)
        {
            //var existingUser =
            //    this._userCredentialsService.GetQueryableEntity(e => e.User.Email == email && SaltedHash.Verify(e.Hash, password) && e.CredentialsType == UserCredentialsType.Google, "User");

            //if (existingUser == null)
            //{
            //    var userToCreate = new UserEntity()
            //    {
            //        Email = email,
            //        Name = email,
            //        UserType = UserType.Pupil,
            //        UserProfile = new UserProfileEntity(),
            //        Credentials = new List<UserCredentialsEntity>()
            //        {
            //            new UserCredentialsEntity()
            //            {
            //                CredentialsType = UserCredentialsType.Google,
            //                Login = email,
            //                Hash = SaltedHash.ComputeHash(password),
            //            }
            //        },
            //    };

            //    var createdUser = this._userService.CreateEntity(userToCreate);

            //    existingUser = createdUser.Credentials.First();
            //}

            //var accessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.User.UserType);

            //var userModel = new UserLoginModel()
            //{
            //    Id = existingUser.UserId,
            //    Name = existingUser.User.Name,
            //    UserType = existingUser.User.UserType,
            //    Token = this._tokenGenerator.WriteToken(accessToken),
            //    TokenExpirationTime = accessToken.ValidTo,
            //};
            //return Ok(userModel);
            return Ok();
        }
    }
}
