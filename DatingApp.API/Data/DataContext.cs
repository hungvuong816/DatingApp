using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        
        public DbSet<Value> Values {get; set; } // name of tables inside database
        public DbSet<User> Users {get;set;}
        public DbSet<Photo> Photos {get;set;}
        
    }

}