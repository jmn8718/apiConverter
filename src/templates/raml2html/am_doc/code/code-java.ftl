[#ftl]
[#macro generateBody action baseUri]
package com.bbva.test.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.Http${action.type?capitalize};
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

public class ApiRestExample
{	 
	public static void main(String[] args) throws Exception { 		
		//API end point to make a call
		String url = "${baseUri}${action.resolvedUri}";
		HttpClientBuilder hcBuilder = HttpClients.custom();
		HttpClient client = hcBuilder.build() ;
		Http${action.type?capitalize} request = new Http${action.type?capitalize}(url); 
[#if action.headerParameters?has_content]
		//Setting header parameters
	[#list action.headerParameters as header]
		[#if header.display?has_content]
		request.addHeader("${header.name}", "${header.display?trim}");
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]
		//Setting the body request
		String body = "xxxx";
		HttpEntity entity = new ByteArrayEntity(body.getBytes("UTF-8"));
		request.setEntity(entity);
		//Executing the call
		HttpResponse response = client.execute(request);
		System.out.println("\nSending '${action.type?capitalize}' to " + url);
		System.out.println("HTTP Response: " +  response.getStatusLine().getStatusCode());
		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
 		//Reading the response
		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		} 
		System.out.println(result.toString()); 
	}
}
[/#macro]

[#macro generateNobody action baseUri]
package com.bbva.test.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.Http${action.type?capitalize};
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

public class ApiRestExample
{	 
	public static void main(String[] args) throws Exception { 		
		//API end point to make a call
		String url = "${baseUri}${action.resolvedUri}";
		HttpClientBuilder hcBuilder = HttpClients.custom();
		HttpClient client = hcBuilder.build() ;
		Http${action.type?capitalize} request = new Http${action.type?capitalize}(url); 
[#if action.headerParameters?has_content]
		//Setting header parameters
	[#list action.headerParameters as header]
		[#if header.display?has_content]
		request.addHeader("${header.name}", "${header.display?trim}");
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]
		//Executing the call
		HttpResponse response = client.execute(request);
		System.out.println("\nSending '${action.type?capitalize}' to " + url);
		System.out.println("HTTP Response: " +  response.getStatusLine().getStatusCode());
		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
 		//Reading the response
		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		} 
		System.out.println(result.toString()); 
	}
}
[/#macro]