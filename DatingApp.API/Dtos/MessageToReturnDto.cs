using System;
using DatingApp.API.Model;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
          public int ID {get;set;}
        public int SenderId {get;set;}
        public User SenderKnownAs {get;set;}
        public string SenderPhotoUrl {get;set;}
        public int RecipientId {get;set;}
        public User RecipientKnownAs {get;set;}
        public string RecipientPhotoUrl {get;set;}
        public string Content {get;set;}
        public bool IsRead {get;set;}
        public DateTime? DateRead {get;set;}
        public DateTime? MessageSent {get;set;}
    }
}