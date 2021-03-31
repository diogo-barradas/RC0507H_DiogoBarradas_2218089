using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Reflection;
using System.IO;
using Microsoft.OpenApi.Models;

namespace SantaShopAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

     
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options => {

                options.AddPolicy("AllowBrowserApps", policy => {

                    policy.AllowAnyOrigin();
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();

                });
            });

            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "API Trabalho",
                    Description = "GESTOR DE CRIAN�AS E PRESENTES"
                });

                                
            
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

       
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            
            app.UseCors("AllowBrowserApps");

            
            app.UseSwagger();

           
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SantaSHOP");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
