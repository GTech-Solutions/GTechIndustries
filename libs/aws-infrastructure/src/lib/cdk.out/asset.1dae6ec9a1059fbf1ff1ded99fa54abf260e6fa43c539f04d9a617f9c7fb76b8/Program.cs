var  CorsAllowSpecificOrigins = "_corsAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
ConfigureServices();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();


app.UseCors(CorsAllowSpecificOrigins);
app.MapControllers();
app.MapHealthChecks("/");

app.MapGet("/", () => "Hello World!");
app.Run();

void ConfigureServices()
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddControllers();
    builder.Services.AddHealthChecks();

    builder.Services.AddCors(options =>
    {
      options.AddPolicy(name: CorsAllowSpecificOrigins,
        policy  =>
        {
          policy.WithOrigins("*");
          policy.AllowAnyHeader();
        });
    });
}
