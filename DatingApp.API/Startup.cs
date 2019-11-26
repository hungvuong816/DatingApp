using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
             services.AddDbContext<DataContext>(x => {
                 x.UseLazyLoadingProxies();
                 x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
             });

             ConfigureServices(services);
        }
        
        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => {
                 x.UseLazyLoadingProxies();
                 x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
             }); // Change UseMySql to UseSqlServer to deploy in Azure since we chose SQL Database on the set up

             ConfigureServices(services);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = 
                        Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddCors();
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddAutoMapper(typeof(DatingRepository).Assembly);
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDAtingRepository,DatingRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSetting:TOken").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<LogUserActivity>(); // Action Filter
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // app.UseExceptionHandler(builder =>{
                //     builder.Run(async context => {
                //         context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                //         var error = context.Features.Get<IExceptionHandlerFeature>();
                //         if (error != null)
                //         {
                //             context.Response.AddApplicationError(error.Error.Message);
                //             await context.Response.WriteAsync(error.Error.Message);
                //         }
                //     });
                // });
                app.UseHsts(); // 191 open content to client 
            }
            app.UseDeveloperExceptionPage(); 
            app.UseHttpsRedirection(); // 191 open content to client 

            // app.UseHttpsRedirection(); // turn off with development
            // very important to add WithExposedHeaders("Pagination") -otherwisre it is return null from API
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().WithExposedHeaders("Pagination"));
            app.UseAuthentication();
            app.UseDefaultFiles(); // 178 for 2.2 only so Angular can run from wwwroot
            app.UseStaticFiles(); // for 2.2 only
            app.UseMvc(routes => // 178 to prevent from refresh missing info, tell API, if not tell API 
            {                       // if does not found, use fall back and this specific action
                routes.MapSpaFallbackRoute( 
                    name: "spa-fallback", // give it a name 
                    defaults: new {controller = "Fallback", action = "Index"} 
                );
            });
        }
    }
}
