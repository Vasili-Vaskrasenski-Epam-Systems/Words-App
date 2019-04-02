using System;
using AutoMapper;
using BL.Infrastructure.Encoders;
using BL.Services;
using BL.Services.Task.SentenceTaskServices;
using BL.Services.Task.VerbTaskServices;
using BL.Services.Task.WordTaskServices;
using BL.Services.User;
using Configuration;
using DAL.Infrastructure;
using Entities.Instances.Sentence;
using Entities.Instances.Task.SentenceTask;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.User;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WordApp.Infrastructure;
using WordApp.Infrastructure.TokenGenerators;


namespace WordApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region Auth
            var signingKey = new SigningSymmetricKey((string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.AuthenticationKey));

            services.AddSingleton<IJwtSigningEncodingKey>(signingKey);

            var signingDecodingKey = (IJwtSigningDecodingKey)signingKey;

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = (string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.SchemaName);
                    options.DefaultChallengeScheme = (string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.SchemaName);
                })
                .AddJwtBearer((string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.SchemaName), jwtBearerOptions =>
                {
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = true,

                        IssuerSigningKey = signingDecodingKey.GetKey(),
                        ValidIssuer = (string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.ValidIssuerName),
                        ValidAudience = (string)this.Configuration.GetValue(typeof(string), Config.JwtConstants.ValidAudienceName),
                        ClockSkew = TimeSpan.Zero,
                    };
                })
                .AddGoogle(googleOptions =>
                {
                    googleOptions.ClientId =
                        Encrypters.Decrypt((string)this.Configuration.GetValue(typeof(string), Config.GoogleConstants.ClientId));

                    googleOptions.ClientSecret =
                        Encrypters.Decrypt((string)this.Configuration.GetValue(typeof(string), Config.GoogleConstants.ClientSecret));
                });
            #endregion

            #region AutoMapper
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingRules()));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion

            #region DbContext
            services.AddIdentity<ApplicationUserEntity, IdentityRole>()
                .AddEntityFrameworkStores<WordsDbContext>()
                .AddDefaultTokenProviders();
            var connectionString = Encrypters.Decrypt(Configuration.GetConnectionString(Config.WordsDbConnectionStringName));
            services.AddDbContext<WordsDbContext>(opts => opts.UseSqlServer(connectionString));
            #endregion

            #region Business Services

            services.AddScoped(typeof(ITokenGenerator), typeof(TokenGenerator));

            services.AddScoped(typeof(BaseEntityService<WordEntity>), typeof(WordService));
            services.AddScoped(typeof(BaseEntityService<VerbEntity>), typeof(VerbService));
            services.AddScoped(typeof(BaseEntityService<UserEntity>), typeof(UserService));
            services.AddScoped(typeof(BaseEntityService<WordTaskEntity>), typeof(WordTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedWordTaskEntity>), typeof(AssignedWordTaskService));
            services.AddScoped(typeof(BaseEntityService<VerbTaskEntity>), typeof(VerbTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedVerbTaskEntity>), typeof(AssignVerbTaskService));
            services.AddScoped(typeof(BaseEntityService<SentenceEntity>), typeof(SentenceService));
            services.AddScoped(typeof(BaseEntityService<SentenceTaskEntity>), typeof(SentenceTaskService));
            services.AddScoped(typeof(BaseEntityService<AssignedSentenceTaskEntity>), typeof(AssignSentenceTaskService));
            services.AddScoped(typeof(BaseEntityService<UserTokenEntity>), typeof(UserTokenService));
            #endregion

            //// In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            loggerFactory.AddLog4Net();

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
