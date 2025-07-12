from user_profile.models import UserProfile

def create_user_profile(username, first_name, last_name, email, password):
    user = UserProfile(username=username, first_name=first_name, last_name=last_name, email=email)
    user.set_password(password)
    user.save()
    return user

def get_all_usernames():
    return UserProfile.objects.values_list('username', flat=True)

def username_trie(usernames):
    trie = {}
    for username in usernames:
        current_node = trie
        for char in username:
            if char not in current_node:
                current_node[char] = {}
            current_node = current_node[char]
        current_node['username'] = username
    return trie