using System;

namespace DatingApp.API.Model
{
    public class Photo
    {
        public int ID {get;set;}
        public string Url {get;set;}
        public string Description {get;set;}
        public DateTime DateAdded {get;set;}
        public bool IsMain {get;set;}
        public User User {get;set;} // from restrict delte to cascade delete
                                    // user delete -> photo will be deleted
        public int UserID {get;set;}
    }
}