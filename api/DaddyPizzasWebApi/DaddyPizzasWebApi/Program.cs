using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using DaddyPizzasWebApi.DataBase;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Determine which connection string to use based on the machine name
string computerName = Environment.MachineName;
string connectionString = computerName switch
{
    "DESKTOP-RE0M47N" => builder.Configuration.GetConnectionString("ConnectionIgor"),
    "DESKTOP2934-16" => builder.Configuration.GetConnectionString("ConnectionNikita"),
    "DESKTOP-CN0JML6" => builder.Configuration.GetConnectionString("ConnectionArtem"),
    "SUPER-PC" => builder.Configuration.GetConnectionString("ConnectionArkadiy"),
    _ => throw new Exception("Unknown machine name")
};

// Configure EF Core with the appropriate connection string
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Json Serializer
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
        .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var app = builder.Build();
app.MapGet("/", () => "Hello world!");
app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
